export default function extractErrors(e: unknown): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = e as any
    if(err.response && err.response.data) return err.response.data
    else if(err.request) return err.request
    else if(err.message) return err.message
    else return 'internal server error'
}