// Type declarations for importing files with Bun
declare module "*.conf" {
  const content: BunFile;
  export default content;
}

declare module "*.gitconfig" {
  const content: BunFile;
  export default content;
}

declare module "*.zshrc" {
  const content: BunFile;
  export default content;
}

declare module "*.plist" {
  const content: BunFile;
  export default content;
}

declare module "*.toml" {
  const content: BunFile;
  export default content;
}
