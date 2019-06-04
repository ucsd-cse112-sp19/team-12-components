rm -r ./docs/en/docs/components
rm -r ./docs/es/docs/components
rm -r ./docs/fr/docs/components
rm -r ./docs/zh/docs/components
node createDocs.js ./packages .js
gulp compileComponents --option production


