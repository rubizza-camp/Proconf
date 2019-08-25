# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'episodes#index'

  # namespace :api do
  #   resources :episodes, only: %i[index create show update destroy]
  # end

  resources :episodes do
    post  'add_start', on: :member
    post  'add_finish', on: :member
    post 'update_youtube_data', on: :member
    resources :announcements
    resources :timecodes
    post '/to_announcement', to: 'episodes#announce', on: :member
  end

  get '/admin', to: 'dashboard#index'
  match '*path', to: 'dashboard#index', via: :all

  post '/admin/telegram', to: 'dashboard#telegram'

  get '*path', to: redirect('/')
end
