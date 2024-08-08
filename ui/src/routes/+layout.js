export const prerender = true;
export const trailingSlash = 'always'; // will prerender pages as index.html with rout name in folder, required by FastAPI static files

// No hace load aquí ya que solo corre durante el build
// export async function load({ }) {
//     return {};
// }
