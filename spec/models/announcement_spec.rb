require 'rails_helper'

# rubocop:disable Metrics/BlockLength
RSpec.describe Announcement, type: :model do
  subject { described_class.new }

  it 'is valid with valid attributes' do
    subject.episode_id = 1
    subject.title = '1st episode announcement title'
    subject.date = Time.now
    subject.target_resource = 'tg'
    expect(subject).to be_valid
  end

  it 'is not valid without episode_id' do
    subject.title = '1st episode announcement title'
    subject.date = Time.now
    subject.target_resource = 'tg'
    expect(subject).to_not be_valid
  end

  it 'is not valid without title' do
    subject.episode_id = 1
    subject.date = Time.now
    subject.target_resource = 'tg'
    expect(subject).to_not be_valid
  end

  it 'is not valid without date' do
    subject.episode_id = 1
    subject.title = '1st episode announcement title'
    subject.target_resource = 'tg'
    expect(subject).to_not be_valid
  end

  it 'is not valid without target_resource' do
    subject.episode_id = 1
    subject.title = '1st episode announcement title'
    subject.date = Time.now
    expect(subject).to_not be_valid
  end
end
# rubocop:enable Metrics/BlockLength
