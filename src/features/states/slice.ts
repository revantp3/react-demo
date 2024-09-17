import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "../../services/store";
import { fetchArticlesAPI } from "../../services/apiService";

// Define types for the article and the slice state
export interface Article {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: string;
  author: string;
  source: string;
}

interface ArticlesState {
  articles: Article[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  sort: "date_desc" | "date_asc" | "title_asc" | "title_desc";
  filters: {
    source: string | null;
    author: string | null;
  };
  currentPage: number;
  articlesPerPage: number;
}

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchArticlesAPI();
      return response;
    } catch (err) {
      return rejectWithValue("Failed to fetch articles");
    }
  }
);
// Initial state of the slice
const initialState: ArticlesState = {
  articles: [],
  status: "idle",
  error: null,
  sort: "date_desc",
  filters: {
    source: null,
    author: null,
  },
  currentPage: 1,
  articlesPerPage: 5,
};

// Async thunk for fetching articles

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    sortArticles: (
      state,
      action: PayloadAction<
        "date_desc" | "date_asc" | "title_asc" | "title_desc"
      >
    ) => {
      state.sort = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.source = action.payload;
    },
    setAuthorFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.author = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state: any, action) => {
        state.status = "succeeded";
        // Assuming the response is an array of articles
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  sortArticles,
  setCategoryFilter,
  setAuthorFilter,
  setCurrentPage,
} = articlesSlice.actions;

// Export selectors
export const selectAllArticles = (state: RootState) => state.articles.articles;

// export const selectFilteredArticles = createSelector(
//   [selectAllArticles, (state: RootState) => state.articles.filters],
//   (articles, filters) => {
//     return articles.filter((article) => {
//       const matchesCategory = filters.source
//         ? article.source === filters.source
//         : true;
//       const matchesAuthor = filters.author
//         ? article.author === filters.author
//         : true;
//       return matchesCategory && matchesAuthor;
//     });
//   }
// );

export const selectCurrentPageArticles = (state: RootState) => {
  const { currentPage, articlesPerPage, articles } = state.articles;
  const startIndex = (currentPage - 1) * articlesPerPage;
  return articles.slice(startIndex, startIndex + articlesPerPage);
};

export const selectFilteredAndSortedArticles = createSelector(
  [selectAllArticles, (state: RootState) => state.articles],
  (articles, { filters, sort }) => {
    let filtered = articles.filter((article) => {
      const matchesCategory = filters.source
        ? article.source === filters.source
        : true;
      const matchesAuthor = filters.author
        ? article.author === filters.author
        : true;
      return matchesCategory && matchesAuthor;
    });

    switch (sort) {
      case "date_desc":
        filtered.sort((a, b) => b.date.localeCompare(a.date));
        break;
      case "date_asc":
        filtered.sort((a, b) => a.date.localeCompare(b.date));
        break;
      case "title_asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title_desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  }
);

// Export the reducer
export default articlesSlice.reducer;
