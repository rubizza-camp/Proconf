require 'rails_helper'

RSpec.describe AnnouncementsController, type: :controller do
  let(:episode) { create(:episode) }
  let(:announcement) { create(:announcement, episode: episode) }

  context 'with not authorized user' do
    describe 'GET #index' do
      before { get :index, params: { episode_id: episode.id } }

      it 'redirects to root' do
        expect(response).to have_http_status(302)
        expect(response).to redirect_to :root
      end
    end

    describe 'GET #show' do
      before { get :show, params: { id: announcement.id, episode_id: episode.id } }

      it 'redirects to root' do
        expect(response).to have_http_status(302)
        expect(response).to redirect_to :root
      end
    end

    describe 'GET #new' do
      before { get :new, params: { id: announcement.id, episode_id: episode.id } }

      it 'redirects to root' do
        expect(response).to have_http_status(302)
        expect(response).to redirect_to :root
      end
    end

    describe 'GET #edit' do
      before { get :edit, params: { id: announcement.id, episode_id: episode.id } }
      
      it 'redirects to root' do
        expect(response).to have_http_status(302)
        expect(response).to redirect_to :root
      end
    end
  end
end
