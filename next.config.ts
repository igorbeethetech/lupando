/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para otimização de imagens se necessário
  images: {
    domains: [],
  },
  // Configuração para permitir importação de SVGs como componentes (opcional)
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;