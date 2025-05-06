const Register = () => {
  return (
    <div className="register-container">
      <h2>Inscription</h2>

      <div className="error-message"></div>

      <div className="form-group">
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          minLength="6"
          required
        />
      </div>

      <button type="submit">
        S'inscrire
      </button>
    </div>
  );
};

export default Register;
