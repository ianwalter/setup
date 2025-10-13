import { $, file } from "bun";
import dockConfig from "./dock.plist" with { type: "file" };
import gitConfig from "./.gitconfig" with { type: "file" };
import zshConfig from "./.zshrc" with { type: "file" };
import ghosttyConfig from "./ghostty.conf" with { type: "file" };
import starshipConfig from "./starship.toml" with { type: "file" };

console.log("\n --- Running setup v18 --- \n");

$.env({
	...process.env,
	HOME: process.env.HOME || `/Users/${process.env.USER || "ian"}`,
	PATH: `/opt/homebrew/bin:${process.env.PATH}`,
});

// Install Bun if not already installed.
const bunCheck = await $`which bun`.quiet();
if (bunCheck.exitCode !== 0) {
	await $`curl -fsSL https://bun.sh/install | bash`;
} else {
	console.log("Bun already installed. Skipping installation.");
}

// Install Homebrew if not already installed.
const brewCheck = await $`which brew`.quiet();
if (brewCheck.exitCode !== 0) {
	await $`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`;
	await $`echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile`;
} else {
	console.log("Homebrew already installed. Skipping installation.");
}

// Install Homebrew Formulae.
await $`brew install bat`; // A better cat command.
await $`brew install biome`; // TS linter/formatter.
await $`brew install eza`; // A better ls command.
await $`brew install gh`; // GitHub CLI.
await $`brew install git`; // Source control.
await $`brew install git-lfs`; // Git LFS.
await $`brew install go`; // Go language.
await $`brew install jq`; // JSON utility.
await $`brew install starship`; // Shell prompt.
await $`brew install trash`; // A better rm command.
await $`brew install zoxide`; // A better cd command.
await $`brew install mprocs`; // Process manager.
await $`brew install uv`; // Python package manager.

// Install Homebrew Casks.
await $`brew install 1password`;
await $`brew install 1password-cli`;
await $`brew install android-studio`;
await $`brew install betterdisplay`;
await $`brew install cleanshot`;
await $`brew install craft`;
await $`brew install ghostty`;
await $`brew install github`;
await $`brew install logi-options+`;
await $`brew install mas`;
await $`brew install ollama`;
await $`brew install openjdk@17`;
await $`brew install orbstack`;
await $`brew install raycast`;
await $`brew install sensei`;
await $`brew install spotify`;
await $`brew install steam`;
await $`brew install tableplus`;
await $`brew install visual-studio-code`;

// Install Mac App Store applications.
await $`mas install 803453959`; // Slack
await $`mas install 497799835`; // Xcode
await $`mas install 1569813296`; // 1Password for Safari
await $`mas install 6748613311`; // Craft Web Clipper

// Disable dock resizing.
await $`defaults write com.apple.Dock size-immutable -bool true`;
// Don't show recent apps in dock.
await $`defaults write com.apple.dock show-recents -bool false`;
// Disable annoying quick note feature.
await $`defaults write com.apple.dock wvous-br-corner -int 0`;
// Set dock position to bottom.
await $`defaults write com.apple.dock orientation -string "bottom"`;
// Disable "Displays have separate Spaces".
await $`defaults write com.apple.spaces spans-displays -bool TRUE`;

// Restore dock app order.
await Bun.write("/tmp/dock.plist", file(dockConfig));
await $`defaults import com.apple.dock /tmp/dock.plist`;

// Restart the dock.
await $`killall Dock`;

// Install global npm packages.
await $`bun install -g @anthropic-ai/claude-code`;
await $`bun install -g @openai/codex`;

// Copy zsh configuration to ~/.zshrc.
await Bun.write("/Users/ian/.zshrc", file(zshConfig));

// Copy git configuration to ~/.gitconfig.
await Bun.write("/Users/ian/.gitconfig", file(gitConfig));

// Configure Ghostty.
await $`mkdir -p ~/Library/Application\ Support/com.mitchellh.ghostty`;
await Bun.write(
	"/Users/ian/Library/Application Support/com.mitchellh.ghostty/config",
	file(ghosttyConfig),
);

// Configure Starship.
await $`mkdir -p ~/.config`;
await Bun.write("/Users/ian/.config/starship.toml", file(starshipConfig));

console.log("\n --- Setup complete --- \n");
