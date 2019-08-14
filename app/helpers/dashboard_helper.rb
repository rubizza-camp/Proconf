module DashboardHelper
  def telegram_credentials
    @credentials.find_by(service: 'telegram')&.data
  end
end
