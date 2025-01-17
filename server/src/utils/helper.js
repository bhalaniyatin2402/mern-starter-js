export function cookieOptions(opts) {
  let options = {
      sameSite: opts?.sameSite || 'Lax',
      httpOnly: opts?.httpOnly || true
  }

  if (opts?.maxAge) {
      options.maxAge = opts?.maxAge
  }

  return options
}
