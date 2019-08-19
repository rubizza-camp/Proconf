require 'rails_helper'

RSpec.describe WebhooksController, type: :controller do
  describe "Create webhook" do
    before { get :complete }

    it 'returns 200 header to trello' do
      expect(response).to have_http_status(200)
    end
  end
end