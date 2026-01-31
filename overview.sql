USE ASHospital

INSERT INTO Overviews (Title, SubTitle, Info, BoxTitle1, BoxDescription1, BoxImage1, BoxTitle2, BoxDescription2, BoxImage2, BoxTitle3, BoxDescription3, BoxImage3)
VALUES ( 
'YOUR MIND MATTERS! TREAT IT LIKE IT DOES!', 
'Mental health is a state of well-being in which an individual realizes their own abilities, can cope with the normal stresses of life, can work productively, and is able to make a contribution to their community. It is a fundamental part of overall health, affecting how we think, feel, and act.', 
'Hover on each to explore more about it', 
'Emotional Well-being', 
'The ability to experience, express, and manage a full range of human emotions (e.g., joy, sadness, fear, anger) in a healthy way.', 
'/images/emotional-wellbeing.jpg',
'Psychological Well-being',
'The ability to think clearly, learn new things, and solve problems. This includes self-acceptance, purpose in life, and personal growth.',
'/images/psychological-wellbeing.png',
'Social Well-being',
'The ability to form and maintain healthy relationships, engage with the community, and manage social interactions.',
'/images/social-wellbeing.jpg'
)

SELECT * FROM OVERVIEWS