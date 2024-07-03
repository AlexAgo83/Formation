puts "Hello"
puts "World".reverse
varHello = "World"
varHello = "Hello #{varHello * 2}"

##### PROMPT #####
puts "Enter your name: "
name = gets.chomp
puts "Hello #{name}"

##### TEST integer / even #####
puts "Give me a number: "
number = gets.chomp
if number.to_i.even?
  puts "Your number is even"
else
  puts "Your number is odd"
end

##### CONDITIONALS 1 #####
puts "Get the good number: "
number_expected = 15
number = gets.chomp.to_i
if number == number_expected
  puts "You got it!"
elsif number < number_expected
  puts "Too low"
else
  puts "Too high"
end

##### CONDITIONALS 2 #####
puts "Get the good number: "
number_expected = 15
number = gets.chomp.to_i
puts "You got it!" if number == number_expected
puts "Too low" if number < number_expected
puts "Too high" if number > number_expected

##### CONDITIONALS 3 #####
puts "Get the good number: "
number_expected = 15
number = gets.chomp.to_i
if number < 0 || number > 100
  puts "Not in range"
else
  puts "You got it!" if number == number_expected
  puts "Too low" if number < number_expected
  puts "Too high" if number > number_expected
end
msg = "Number set to: #{number}".upcase!
puts msg

##### CONDITIONALS 4 #####
puts "Try a palindrome: "
txt = gets.chomp
palindrome = txt.reverse
if txt == palindrome
  puts "It's a palindrome!"
else
  puts "Not a palindrome"
end

##### ARRAY #####
tab = ["Alex", "Bob", "Charlie"]
tab.each do |name|
  puts name
end
vartab = tab.join(", ")
msg = "Le tableau contient: #{vartab}"
puts msg
tab.push("Franck", "Gérard")
puts tab

##### HASH #####
## Empty Hash
person = {}
## Filled Hash
person = {'name' => 'Alex', 'age' => 40}
puts person['name']

##### SYMBOLS #####
puts :red.to_s
person = {name: 'Alex', age: 40}
puts person
puts person[:name]
