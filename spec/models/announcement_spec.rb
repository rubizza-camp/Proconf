require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe Announcement, type: :model do
  ANNOUNCEMENT_VALID_PARAMS = { episode_id: 1, title: 'Title', date: Time.now, target_resource: 'telegram' }.freeze
  ANNOUNCEMENT_INVALID_PARAMS_NO_EPISODE = { title: 'Title', date: Time.now, target_resource: 'telegram' }.freeze
  ANNOUNCEMENT_INVALID_PARAMS_NO_TITLE = { episode_id: 1, date: Time.now, target_resource: 'telegram' }.freeze
  ANNOUNCEMENT_INVALID_PARAMS_NO_DATE = { episode_id: 1, title: 'Title', target_resource: 'telegram' }.freeze
  ANNOUNCEMENT_INVALID_PARAMS_NO_RESOURCE = { episode_id: 1, title: 'Title', date: Time.now }.freeze
  TELEGRAM_ANNOUNCEMENT_PARAMS = { episode_id: 1, title: 'Title', date: Time.now, target_resource: 'telegram' }.freeze
  TWITTER_ANNOUNCEMENT_PARAMS = { episode_id: 1, title: 'Title', date: Time.now, target_resource: 'twitter' }.freeze
  VK_ANNOUNCEMENT_PARAMS = { episode_id: 1, title: 'Title', date: Time.now, target_resource: 'vk' }.freeze

  context 'with valid params' do
    let(:valid_announcement) { described_class.new(ANNOUNCEMENT_VALID_PARAMS) }

    it { expect(valid_announcement).to be_valid }
  end

  context 'with invalid params' do
    let(:announcement_without_episode) { described_class.new(ANNOUNCEMENT_INVALID_PARAMS_NO_EPISODE) }
    let(:announcement_without_title) { described_class.new(ANNOUNCEMENT_INVALID_PARAMS_NO_TITLE) }
    let(:announcement_without_date) { described_class.new(ANNOUNCEMENT_INVALID_PARAMS_NO_DATE) }
    let(:announcement_without_resource) { described_class.new(ANNOUNCEMENT_INVALID_PARAMS_NO_RESOURCE) }

    it { expect(announcement_without_episode).to be_invalid }
    it { expect(announcement_without_title).to be_invalid }
    it { expect(announcement_without_date).to be_invalid }
    it { expect(announcement_without_resource).to be_invalid }
  end

  context 'with available and unavailable resources' do
    let(:telegram_announcement) { described_class.new(TELEGRAM_ANNOUNCEMENT_PARAMS) }
    let(:twitter_announcement) { described_class.new(TWITTER_ANNOUNCEMENT_PARAMS) }
    let(:vk_announcement) { described_class.new(VK_ANNOUNCEMENT_PARAMS) }

    it { expect(telegram_announcement).to be_valid }
    it { expect(twitter_announcement).to be_valid }
    it { expect(vk_announcement).to be_invalid }
  end
end
# rubocop:enable Metrics/BlockLength
