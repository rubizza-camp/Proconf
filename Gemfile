# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.3'
gem 'aasm', '~> 5.0', '>= 5.0.5'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'bootstrap', '~> 4.3.1'
gem 'cancancan', '~> 3.0.1'
gem 'coffee-rails', '~> 4.2'
gem 'devise', '~> 4.6', '>= 4.6.2'
gem 'jbuilder', '~> 2.5'
gem 'kaminari'
gem 'mini_racer', platforms: :ruby
gem 'pg'
gem 'puma', '~> 3.11'
gem 'rails', '~> 5.2.3'
gem 'sass-rails', '~> 5.0'
gem 'slim', '~> 4.0.1'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker', '~> 4.x'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'pry', '~> 0.12.2'
  gem 'pry-rails', '~> 0.3.9'
  gem 'rspec-rails', '~> 3.8'
  gem 'rubocop', '~> 0.74.0'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'chromedriver-helper'
  gem 'factory_bot', '~> 5.0'
  gem 'rails-controller-testing', '~> 1.0', '>= 1.0.4'
  gem 'selenium-webdriver'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
