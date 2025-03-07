import { $ } from "bun";

// Install Bun.
await $`curl -fsSL https://bun.sh/install | bash`;

// Install Homebrew.
await $`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`;

// Install Homebrew Formulae.
await $`brew install gh`; // GitHub CLI.
await $`brew install git`; // Source control.
await $`brew install go`; // Go language.
await $`brew install jq`; // JSON utility.
await $`brew install starship` // Shell prompt.
await $`brew install trash` // A better rm command.
await $`brew install zoxide` // A better cd command.

// Install Homebrew Casks.
await $`brew install 1password`;
await $`brew install 1password-cli`;
await $`brew install android-studio`;
await $`brew install cursor`;
await $`brew install elgato-stream-deck`;
await $`brew install ghostty`;
await $`brew install logi-options+`;
await $`brew install ollama`;
await $`brew install orbstack`;
await $`brew install raycast`;
await $`brew install sensei`;
await $`brew install spotify`;
await $`brew install steam`;
await $`brew install tableplus`;
await $`brew install visual-studio-code`;
await $`brew install zed`;
await $`brew install zen-browser`;
await $`brew install zoom`;

//

//
// await $`source ~/.zshrc`
