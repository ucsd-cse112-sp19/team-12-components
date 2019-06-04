const jjLink = 
    () => {
        const template = document.createElement('template');
        template.innerHTML = `
        
    <style> 
    .primary{
        color: var(--active-text-color, #57c8ff);
    }
    .success{
        color: var(--active-text-color, #75c74c);
    }
    .warning{
        color: var(--active-text-color, #f5bc42);
    }
    .danger{
        color: var(--active-text-color, #f87e70);
    }
    .info{
        color: var(--active-text-color, #9dc2e8);
    }
    .disabled{
        opacity: 0.4;
        pointer-events: none;
    }
    .text{
        .text {
            margin: 0 5px;
            font-size: 14px;
            font-weight: 500;
            font-family: var(--text-font,
            Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,
            Microsoft YaHei,SimSun,sans-serif);
            color: var(--inactive-text-color, #303133);
          }
    }
    </style>
    <template>
        <a href = "https://google.com"> <slot></slot></a>
    </template>
    `;

    class jjLink extends HTMLElement {
        constructor() {
            super();
            this.root = this.attachShadow({mode : 'open'});
            this.root.appendChild(template.content.cloneNode(true));
            console.log(this.innerHTML);
        }        
    }
    customElements.define('jj-link', jjLink);
}
jjLink();