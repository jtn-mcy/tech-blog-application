const router = require('express').Router();
const { User } = require('../../models/user');

// localhost:3001/api/users/, frontend will fetch post to this
//CREATE a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(userData);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//attempt to login at api/users/login
router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!userData) {
            res.status(400).json({ message: "Incorrect email or password.  Please try again!" });
            return;
        };

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: "Incorrect email or password. Please try again!" });
            return;
        };

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json({ user: userData, message: "You are now logged in!" })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Logout at /api/users/logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

module.exports = router;