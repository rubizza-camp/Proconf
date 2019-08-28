# require 'rails_helper'

# RSpec.describe Api::V1::AnnouncementsController, type: :controller do
#   describe "Messages API" do
#     it 'sends a list of announcements' do
#       FactoryBot.create_list(:episode, 10)
  
#       get '/api/v1/episodes'
  
#       json = JSON.parse(response.body)
  
#       # test for the 200 status-code
#       expect(response).to be_success
  
#       # check to make sure the right amount of messages are returned
#       expect(json['messages'].length).to eq(10)
#     end
#   end
  
  
#   # let(:episode) { create(:episode) }
#   # let(:announcement) { create(:announcement, episode: episode) }

#   # describe "get all questions route", :type => :request do
#   #   let!(:questions) {FactoryBot.create_list(:random_question, 20)}
#   #   before {get '/api/v1/questions'}
  
#   #   it 'returns all questions' do
#   #     expect(JSON.parse(response.body).size).to eq(20)
#   #   end
  
#   #   it 'returns status code 200' do
#   #     expect(response).to have_http_status(:success)
#   #   end
#   # end
    
#   # describe 'GET #index' do
#   #   before { get :index, params: { episode_id: episode.id } }

#   #   it "JSON body response contains expected recipe attributes" do
#   #     json_response = JSON.parse(response.body)
#   #     expect(hash_body.keys).to match_array([:id, :ingredients, :instructions])
#   #   end
#   # end

#   # describe 'GET #show' do
#   #   before { get :show, params: { id: announcement.id, episode_id: episode.id } }

#   #   it 'redirects to root' do
#   #     expect(response).to have_http_status(302)
#   #     expect(response).to redirect_to :root
#   #   end
#   # end

#   # describe 'GET #new' do
#   #   before { get :new, params: { id: announcement.id, episode_id: episode.id } }

#   #   it 'redirects to root' do
#   #     expect(response).to have_http_status(302)
#   #     expect(response).to redirect_to :root
#   #   end
#   # end

#   # describe 'GET #edit' do
#   #   before { get :edit, params: { id: announcement.id, episode_id: episode.id } }
    
#   #   it 'redirects to root' do
#   #     expect(response).to have_http_status(302)
#   #     expect(response).to redirect_to :root
#   #   end
#   # end
# end
