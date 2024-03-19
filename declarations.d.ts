// declarations.d.ts

interface Window {
  ethereum?: {
    enable: () => Promise<string[]>
  }
}
