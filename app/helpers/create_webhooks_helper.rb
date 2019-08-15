module CreateWebhooksHelper
  def user_creds
    current_user.credentials.find_by(service: 'trello')&.data
  end 
end
