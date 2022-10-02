import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {} from "dotenv/config";

const newsApiHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-key": process.env.REACT_APP_X_RAPID_API_KEY,
  "x-rapidapi-host": process.env.REACT_APP_X_RAPID_API_HOST_BING_NEWS,
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: newsApiHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
