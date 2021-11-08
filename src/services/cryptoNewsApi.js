import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const newsApiHeaders = {
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': 'cbe0339db0msh2daae506a51a3a4p1940e3jsn1ebae4488c25'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/';

const createRequest = (url) => ({url, headers: newsApiHeaders});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    })
  })
})

export const {useGetCryptoNewsQuery} = cryptoNewsApi;