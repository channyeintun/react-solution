export function handleResponse(response) {
      return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                  const error = (data && (data.message)) || response.statusText;
                  throw new Error(error);
            }
            return data;
      });
}

export * from './product.service';