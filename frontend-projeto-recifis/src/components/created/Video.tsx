


export function Video({ path }: { path: string }) {
    return (
      <video width="320" height="240" controls preload="none">
        <source src={path} type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="pt-br"
          label="Portuguese"
        />
        Your browser does not support the video tag.
      </video>
    )
  }