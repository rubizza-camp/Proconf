# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'episodes#index'

  resources :episodes do
    get 'download'
    post  'add_start', on: :member
    post  'add_finish', on: :member
    post 'update_youtube_data', on: :member
    resources :announcements
    post '/to_announcement', to: 'episodes#announce', on: :member
    resources :timecodes
  end

  get '/admin', to: 'dashboard#index'
  post '/admin/telegram', to: 'dashboard#telegram'

  get '/auth/trello/callback', to: 'trello_callbacks#trello'
  get '/webhooks/receive', to: 'webhooks#complete'
  post '/webhooks/receive', to: 'webhooks#receive'
  get '/webhooks/create', to: 'webhooks#create'

  get '*path', to: redirect('/')
end
