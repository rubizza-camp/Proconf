require 'rails_helper'

RSpec.describe Episode, type: :model do
  subject { described_class.new }

  it 'is valid with valid attributes' do
    subject.title = 'Title'
    subject.date = Time.now
    expect(subject).to be_valid
  end

  it 'is not valid without date' do
    subject.title = 'Title'
    expect(subject).to_not be_valid
  end

  it 'is not valid without title' do
    subject.date = Time.now
    expect(subject).to_not be_valid
  end
end
