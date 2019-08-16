require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe AnnouncementsController, type: :controller do
  let(:episode) { create(:episode) }
  let(:announcement) { create(:announcement, episode: episode) }

  context 'with authorized user' do
    let(:role) { create(:role) }
    before do
      @user = create(:user, role: role)

      allow(controller).to receive(:authenticate_user!).and_return(true)
      allow(controller).to receive(:current_user).and_return(@user)
    end

    it 'show announcements #index' do
      get :index, params: { episode_id: episode.id }
      expect(response).to have_http_status :ok
      expect(response).to render_template(:index)
    end

    it 'show announcements #show' do
      get :show, params: { id: announcement.id, episode_id: episode.id }
      expect(response).to have_http_status :ok
      expect(response).to render_template(:show)
      expect(assigns(:announcement)).to eq(announcement)
    end

    it 'show announcements #new' do
      get :new, params: { id: announcement.id, episode_id: episode.id }
      expect(response).to have_http_status :ok
      expect(response).to render_template(:new)
    end

    it 'show announcements #edit' do
      get :edit, params: { id: announcement.id, episode_id: episode.id }
      expect(response).to have_http_status :ok
      expect(response).to render_template(:edit)
      expect(assigns(:announcement)).to eq(announcement)
    end
  end
end
# rubocop:enable Metrics/BlockLength
