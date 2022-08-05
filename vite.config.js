import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import Unocss from 'unocss/vite';

export default defineConfig({
  base: "",
  plugins: [vue(), Unocss()],
});
