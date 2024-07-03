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
