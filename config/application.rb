# frozen_string_literal: true

require_relative 'boot'
require 'rails/all'

Bundler.require(*Rails.groups)

module Proconf
  class Application < Rails::Application
    config.load_defaults 5.2
    config.assets.paths << "#{Rails.root}/assets"
  end
end
