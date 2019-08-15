Rails.application.config.middleware.use OmniAuth::Builder do
    provider :trello, ENV['PROCONF_APIKEY'], ENV['PROCONF_TOKEN'], 
      app_name: 'ProConfApp', scope: 'read', 
      expiration: 'never'
end
