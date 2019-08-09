# frozen_string_literal: true

Rails.application.routes.draw do
  resources :admin
  resources :episodes
  devise_for :users
  root 'episodes#index'
end
