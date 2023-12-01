import jwt from 'jsonwebtoken';

//Authetication for user 

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'You need authenticate to use this features ' });
  }

  try {
    console.log('Token received:', token);
    const decoded = jwt.verify(token,'your');
    //console.log("thisis ",decoded)
    req.userId = decoded.userId;
    console.log('Token decoded successfully:', decoded);
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ error: 'Invalid token.' });
  }
};


export { authenticateUser };
