"use client";

export default function CopyToClipboard() {
  async function handleCopyToClipboard() {
    const image = await fetch(`${window.location.pathname}/opengraph-image`).then((res) =>
      res.blob(),
    );

    await navigator.clipboard.write([new ClipboardItem({[image.type]: image})]);
  }

  return (
    <button type="button" onClick={handleCopyToClipboard}>
      Copy to clipboard
    </button>
  );
}
