module DashboardHelper
  def telegram_credentials
    current_user.credentials.find_by(service: 'telegram')&.data
  end
end
