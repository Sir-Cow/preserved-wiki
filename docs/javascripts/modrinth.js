document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".mod-card[data-modrinth]");

  const formatLoader = (loader) => {
    const names = {
      fabric: "Fabric",
      forge: "Forge",
      neoforge: "NeoForge"
    };

    return names[loader] ?? loader;
  };

  const parseMinecraftVersion = (version) => {
    const match = version.match(/^(\d+)\.(\d+)(?:\.(\d+))?$/);
    if (!match) {
      return null;
    }

    return {
      major: Number(match[1]),
      minor: Number(match[2]),
      patch: match[3] === undefined ? 0 : Number(match[3]),
      hasPatch: match[3] !== undefined,
      version
    };
  };

  const compareMinecraftVersions = (a, b) => {
    const versionA = parseMinecraftVersion(a);
    const versionB = parseMinecraftVersion(b);

    if (!versionA || !versionB) {
      return b.localeCompare(a, undefined, {
        numeric: true,
        sensitivity: "base"
      });
    }
    if (versionA.major !== versionB.major) {
      return versionB.major - versionA.major;
    }
    if (versionA.minor !== versionB.minor) {
      return versionB.minor - versionA.minor;
    }

    return versionB.patch - versionA.patch;
  };

  const compareParsedVersions = (a, b) => {
    if (a.major !== b.major) {
      return a.major - b.major;
    }
    if (a.minor !== b.minor) {
      return a.minor - b.minor;
    }

    return a.patch - b.patch;
  };

  const formatVersionRange = (versions) => {
    const first = versions[0];
    const last = versions[versions.length - 1];
    if (versions.length === 1) {
      return first.version;
    }

    if (first.major === last.major && first.minor === last.minor) {
      if (first.patch === 0 && last.patch === 1) {
        return `${first.major}.${first.minor}–${last.version}`;
      }

      return `${first.version}–${last.version}`;
    }

    return `${first.version}–${last.version}`;
  };

  const consolidateMinecraftVersions = (versions, allGameVersions) => {
    const parsedVersions = versions.map(parseMinecraftVersion).filter(Boolean);
    const unsupportedVersions = versions.filter(
      (version) => !parseMinecraftVersion(version)
    );
    const canonicalVersions = allGameVersions
      .map(parseMinecraftVersion)
      .filter(Boolean);
    const supportedKeys = new Set(
      parsedVersions.map(
        (version) => `${version.major}.${version.minor}.${version.patch}`
      )
    );
    const grouped = new Map();
    for (const version of parsedVersions) {
      const key = `${version.major}.${version.minor}`;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key).push(version);
    }
    const consolidated = [];
    for (const group of grouped.values()) {
      group.sort(compareParsedVersions);
      let run = [];

      const flushRun = () => {
        if (run.length === 0) {
          return;
        }

        const first = run[0];
        const last = run[run.length - 1];
        const canonicalPatches = canonicalVersions
          .filter((version) => version.major === first.major && version.minor === first.minor)
          .sort((a, b) => a.patch - b.patch);
        const isCompletePatchSet =
          canonicalPatches.length > 1 &&
          canonicalPatches.every((version) =>
            supportedKeys.has(`${version.major}.${version.minor}.${version.patch}`)
          );

        if (
          isCompletePatchSet &&
          first.patch === canonicalPatches[0].patch &&
          last.patch === canonicalPatches[canonicalPatches.length - 1].patch
        ) {
          consolidated.push(`${first.major}.${first.minor}.x`);
        } 
        else {
          consolidated.push(formatVersionRange(run));
        }

        run = [];
      };

      for (let index = 0; index < group.length; index++) {
        const current = group[index];
        const previous = group[index - 1];
        if (!previous || current.patch === previous.patch + 1) {
          run.push(current);
        } 
        else {
          flushRun();
          run.push(current);
        }
      }
      flushRun();
    }

    consolidated.push(...unsupportedVersions);
    return consolidated.sort(compareMinecraftVersions);
  };

  const formatVersions = (versions, allGameVersions) => {
    if (!versions.length) {
      return "Unknown";
    }

    return consolidateMinecraftVersions(versions, allGameVersions).join(" ");
  };

  const getLatestVersion = (versions) => {
    if (!versions.length) {
      return null;
    }

    return [...versions].sort((a, b) => new Date(b.date_published) - new Date(a.date_published))[0];
  };

  const loadModrinthData = async (card) => {
    const slug = card.dataset.modrinth;
    const versionElement = card.querySelector(".mod-version");
    const versionsElement = card.querySelector(".mod-versions");
    const loadersElement = card.querySelector(".mod-loaders");

    try {
      const [projectResponse, versionsResponse, gameVersionsResponse] =
        await Promise.all([
          fetch(`https://api.modrinth.com/v2/project/${slug}`),
          fetch(`https://api.modrinth.com/v2/project/${slug}/version?limit=100`),
          fetch("https://api.modrinth.com/v2/tag/game_version")
        ]);

      if (!projectResponse.ok || !versionsResponse.ok || !gameVersionsResponse.ok) {
        throw new Error(`Failed to retrieve Modrinth data for ${slug}`);
      }

      const project = await projectResponse.json();
      const versions = await versionsResponse.json();
      const allGameVersions = await gameVersionsResponse.json();
      const latestVersion = getLatestVersion(versions);

      if (slug === "preserved-inferno") {
        if (latestVersion) {
          versionElement.textContent = `v${latestVersion.version_number}`;
          versionsElement.textContent =
            latestVersion.game_versions?.[0] ?? "Unknown";
        } 
        else {
          versionElement.textContent = "Unavailable";
          versionsElement.textContent = "Unavailable";
        }
      } 
      else {
        versionElement.textContent = latestVersion ? `v${latestVersion.version_number}` : "Unavailable";
        versionsElement.textContent = formatVersions(
          project.game_versions ?? [],
          allGameVersions.map((version) => version.version)
        );
      }

      loadersElement.textContent = (project.loaders ?? []).map(formatLoader).join(", ");
    } 
    catch (error) {
      console.error(`Failed to load Modrinth data for ${slug}:`, error);
      versionElement.textContent = "Unavailable";
      versionsElement.textContent = "Unavailable";
      loadersElement.textContent = "Unavailable";
    }
  };
  cards.forEach(loadModrinthData);
});
