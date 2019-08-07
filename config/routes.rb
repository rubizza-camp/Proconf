# frozen_string_literal: true

Rails.application.routes.draw do
  resources :admin
  devise_for :users
end
