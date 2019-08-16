require 'rails_helper'

RSpec.describe AnnouncementsController, type: :controller do
  let(:episode) { create(:episode) }
  let(:announcement) { create(:announcement, episode: episode) }

  context 'with not authorized user' do
    it 'redirect from announcements #index to root' do
      get :index, params: { episode_id: episode.id }
      expect(response).to have_http_status(302)
      expect(response).to_not render_template(:index)
    end

    it 'redirect from announcements #show to root' do
      get :show, params: { id: announcement.id, episode_id: episode.id }
      expect(response).to have_http_status(302)
      expect(response).to_not render_template(:show)
    end

    it 'redirect from announcements #new to root' do
      get :new, params: { id: announcement.id, episode_id: episode.id }
      expect(response).to have_http_status(302)
      expect(response).to_not render_template(:new)
    end

    it 'redirect from announcements #edit to root' do
      get :edit, params: { id: announcement.id, episode_id: episode.id }
      expect(response).to have_http_status(302)
      expect(response).to_not render_template(:edit)
    end
  end
end
