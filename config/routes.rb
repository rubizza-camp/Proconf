# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'episodes#index'

  resources :episodes do
    post  'add_start', on: :member
    post  'add_finish', on: :member
    post 'update_youtube_data', on: :member
    resources :announcements
    resources :timecodes
  end

  get '/admin', to: 'dashboard#index'
  post '/admin/telegram', to: 'dashboard#telegram'

  post '/episodes/:id/to_announcement', to: 'episodes#to_announcement'
  get '*path', to: redirect('/')
end
