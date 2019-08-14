# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'episodes#index'

  resources :episodes do
    resources :announcements
  end

  get '/admin', to: 'dashboard#index'

  get '*path', to: redirect('/')
end
