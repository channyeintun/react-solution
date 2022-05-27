import { config } from './config';
import { handleResponse } from '.';

export const productService = {
      getAllProducts,
      getProductById,
      deleteProductById,
      updateProduct,
      saveProduct,
};

function getAllProducts() {
      const requestOptions = {
            method: 'GET',
      };

      return fetch(`${config.apiUrl}/products`, requestOptions)
            .then(handleResponse);
}

function getProductById(id){
      const requestOptions={
            method:'GET',
      }

      return fetch(`${config.apiUrl}/products/${id}`,requestOptions)
            .then(handleResponse);
}

function deleteProductById(id){
      const requestOptions={
            method:'DELETE',
      }

      return fetch(`${config.apiUrl}/products/${id}`,requestOptions)
            .then(handleResponse);
}

function updateProduct({
      id,
      processTitle,
      subprocessTitle,
      subprocessVersion,
}){
      const requestOptions={
            method:'PUT',
            headers:{
                  'Content-Type':'Application/JSON'
            },
            body:JSON.stringify({
                  processTitle,
                  subprocessTitle,
                  subprocessVersion,
            })
      }

      return fetch(`${config.apiUrl}/products/${id}`,requestOptions)
            .then(handleResponse);
}

function saveProduct({
      processTitle,
      subprocessTitle,
      subprocessVersion,
}){
      const requestOptions={
            method:'POST',
            headers:{
                  'Content-Type':'Application/JSON'
            },
            body:JSON.stringify({
                  processTitle,
                  subprocessTitle,
                  subprocessVersion,
            })
      }

      return fetch(`${config.apiUrl}/products`,requestOptions)
            .then(handleResponse);
}
