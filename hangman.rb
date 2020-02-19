require 'sinatra/base'

class Hangman < Sinatra::Base
  set :sessions, true
  set :app_file, './hangman/hangman.rb'

  get '/' do
    words = File.open("./hangman/wordlist.txt").each_line.to_a
    wordpair = words[rand words.count].chomp.split(',')
    
    session["keyword"] = wordpair[0]
    session["hint"] = wordpair[1]

    erb :hangman
  end

  get '/keyword-pls' do
    pass if session["keyword"].nil?
    session["keyword"]
  end
  
  get '/hint-pls' do
    pass if session["hint"].nil?
    session["hint"].capitalize
  end

  get '/check/:letter' do |letter|
    pass if session["keyword"].nil?
    result = []
    session["keyword"].split('').each.with_index do |c, i|
      result.push i if c.upcase == letter.upcase
    end
    result.to_s
  end
end
