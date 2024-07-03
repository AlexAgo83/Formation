##### FOR #####
for num in 1..5
  puts "num is now: #{num}"
end

##### TEST: FOR #####
expected = 15
value = 0
chance = 10
for num in 1..chance
  next if value == expected
  puts "Get the good number: "
  value = gets.chomp.to_i
  break if value == expected
  puts "Too low" if value < expected
  puts "Too high" if value > expected
  puts "Try again! you have #{chance - num} tries left."
end
puts "You got it!"
