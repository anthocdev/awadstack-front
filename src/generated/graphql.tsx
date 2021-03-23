import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  movies: PaginatedMovies;
  movie?: Maybe<Movie>;
  me?: Maybe<User>;
  comments: PaginatedComments;
  commment?: Maybe<UserComment>;
};


export type QueryMoviesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryMovieArgs = {
  id: Scalars['Int'];
};


export type QueryCommentsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryCommmentArgs = {
  id: Scalars['Float'];
};

export type PaginatedMovies = {
  __typename?: 'PaginatedMovies';
  movies: Array<Movie>;
  hasMore: Scalars['Boolean'];
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  year: Scalars['Float'];
  genre: Scalars['String'];
  rating: Scalars['Float'];
  imdbId: Scalars['String'];
  imageLink: Scalars['String'];
  comments?: Maybe<Array<UserComment>>;
};

export type UserComment = {
  __typename?: 'UserComment';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  body: Scalars['String'];
  likes: Scalars['Float'];
  dislikes: Scalars['Float'];
  userId: Scalars['Float'];
  movieId: Scalars['Float'];
  user: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  avatarId: Scalars['Int'];
  email: Scalars['String'];
  comments?: Maybe<Array<UserComment>>;
  accessLevel: Scalars['Int'];
  username: Scalars['String'];
};

export type PaginatedComments = {
  __typename?: 'PaginatedComments';
  comments: Array<UserComment>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMovie: Movie;
  updateMovie?: Maybe<Movie>;
  deleteMovie: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createComment: UserComment;
};


export type MutationCreateMovieArgs = {
  imdbId: Scalars['String'];
  imageLink: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdateMovieArgs = {
  imdbId?: Maybe<Scalars['String']>;
  imageLink?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeleteMovieArgs = {
  id: Scalars['Float'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  avatarid: Scalars['Int'];
  authinfo: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  movieId: Scalars['Float'];
  input: CommentInput;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type CommentInput = {
  body: Scalars['String'];
};

export type BasicErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type BasicMovieFragment = (
  { __typename?: 'Movie' }
  & Pick<Movie, 'id' | 'title' | 'imdbId' | 'imageLink' | 'rating' | 'genre' | 'year' | 'updatedAt' | 'createdAt'>
);

export type BasicUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'accessLevel' | 'username' | 'avatarId'>
);

export type BasicUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & BasicErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & BasicUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & BasicUserResponseFragment
  ) }
);

export type CreateMovieMutationVariables = Exact<{
  title: Scalars['String'];
  imdbId: Scalars['String'];
  imageLink: Scalars['String'];
}>;


export type CreateMovieMutation = (
  { __typename?: 'Mutation' }
  & { createMovie: (
    { __typename?: 'Movie' }
    & BasicMovieFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & BasicUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  avatarid: Scalars['Int'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & BasicUserResponseFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & BasicUserFragment
  )> }
);

export type MovieQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MovieQuery = (
  { __typename?: 'Query' }
  & { movie?: Maybe<(
    { __typename?: 'Movie' }
    & Pick<Movie, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'year' | 'genre' | 'rating' | 'imdbId' | 'imageLink'>
    & { comments?: Maybe<Array<(
      { __typename?: 'UserComment' }
      & Pick<UserComment, 'id' | 'createdAt' | 'updatedAt' | 'body' | 'likes' | 'dislikes'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )>> }
  )> }
);

export type MoviesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type MoviesQuery = (
  { __typename?: 'Query' }
  & { movies: (
    { __typename?: 'PaginatedMovies' }
    & Pick<PaginatedMovies, 'hasMore'>
    & { movies: Array<(
      { __typename?: 'Movie' }
      & BasicMovieFragment
    )> }
  ) }
);

export const BasicMovieFragmentDoc = gql`
    fragment BasicMovie on Movie {
  id
  title
  imdbId
  imageLink
  rating
  genre
  year
  updatedAt
  createdAt
}
    `;
export const BasicErrorFragmentDoc = gql`
    fragment BasicError on FieldError {
  field
  message
}
    `;
export const BasicUserFragmentDoc = gql`
    fragment BasicUser on User {
  id
  accessLevel
  username
  avatarId
}
    `;
export const BasicUserResponseFragmentDoc = gql`
    fragment BasicUserResponse on UserResponse {
  errors {
    ...BasicError
  }
  user {
    ...BasicUser
  }
}
    ${BasicErrorFragmentDoc}
${BasicUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...BasicUserResponse
  }
}
    ${BasicUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateMovieDocument = gql`
    mutation CreateMovie($title: String!, $imdbId: String!, $imageLink: String!) {
  createMovie(title: $title, imdbId: $imdbId, imageLink: $imageLink) {
    ...BasicMovie
  }
}
    ${BasicMovieFragmentDoc}`;

export function useCreateMovieMutation() {
  return Urql.useMutation<CreateMovieMutation, CreateMovieMutationVariables>(CreateMovieDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...BasicUserResponse
  }
}
    ${BasicUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!, $avatarid: Int!) {
  register(
    authinfo: {username: $username, password: $password, email: $email}
    avatarid: $avatarid
  ) {
    ...BasicUserResponse
  }
}
    ${BasicUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...BasicUser
  }
}
    ${BasicUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MovieDocument = gql`
    query Movie($id: Int!) {
  movie(id: $id) {
    id
    createdAt
    updatedAt
    title
    year
    genre
    rating
    imdbId
    imageLink
    comments {
      id
      createdAt
      updatedAt
      body
      likes
      dislikes
      user {
        id
        username
      }
    }
  }
}
    `;

export function useMovieQuery(options: Omit<Urql.UseQueryArgs<MovieQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MovieQuery>({ query: MovieDocument, ...options });
};
export const MoviesDocument = gql`
    query Movies($limit: Int!, $cursor: String) {
  movies(limit: $limit, cursor: $cursor) {
    hasMore
    movies {
      ...BasicMovie
    }
  }
}
    ${BasicMovieFragmentDoc}`;

export function useMoviesQuery(options: Omit<Urql.UseQueryArgs<MoviesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MoviesQuery>({ query: MoviesDocument, ...options });
};