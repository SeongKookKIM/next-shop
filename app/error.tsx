"use client";

interface errotTypes {
  error: any;
  reset: any;
}

export default function Error({ error, reset }: errotTypes) {
  return (
    <div>
      <p>Error</p>
      <button type="button" onClick={reset()}>
        Reset
      </button>
    </div>
  );
}
