export const validateFieldsRequired = (req, res, next) => {
    const { name, email, password } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Nome é obrigatório!'})
    }
  
    if (!email) {
      return res.status(400).json({ message: 'Email é obrigatório!'})
    }
  
    if (!password) {
      return res.status(400).json({ message: 'Senha é obrigatória!'})
    }
  
    return next();
  }