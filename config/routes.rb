# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'episodes#index'

  namespace :api do
    namespace :v1 do
      post 'user_token' => 'user_token#create'
      resources :episodes, only: %i[index show create update destroy] do
        post 'add_finish', on: :member
        post 'add_start', on: :member
        post 'update_youtube_data', on: :member
        post 'to_announcement', on: :member
        post 'to_online', on: :member
        post 'to_finished', on: :member
        resources :announcements, only: %i[index show create update destroy]
        resources :timecodes, only: %i[index show create update destroy]
      end
      get '/webhooks/receive', to: 'webhooks#complete'
      post '/webhooks/receive', to: 'webhooks#receive'
      post '/webhooks/create', to: 'webhooks#create'
      get '/users_boards', to: 'webhooks#users_boards'
      get '/auth/trello/callback', to: 'trello_callbacks#trello'
    end
  end

  get '/admin', to: 'dashboard#index'

  get '/auth/trello/callback', to: 'trello_callbacks#trello'
  get '/webhooks/receive', to: 'webhooks#complete'
  post '/webhooks/receive', to: 'webhooks#receive'
  get '/webhooks/create', to: 'webhooks#create'

  get '*path', to: redirect('/')
end
