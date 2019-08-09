require 'rails_helper'

RSpec.describe Author, type: :model do
  subject { described_class.new }

  it 'is valid with valid attributes' do
    subject.name = 'Name'
    subject.surname = 'Surname'
    expect(subject).to be_valid
  end

  it 'is not valid without a name' do
    subject.surname = 'Surname'
    expect(subject).to_not be_valid
  end

  it 'is not valid without a surname' do
    subject.name = 'Name'
    expect(subject).to_not be_valid
  end
end
