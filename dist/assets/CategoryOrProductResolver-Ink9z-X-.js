import{n as e,s as t,t as n}from"./jsx-runtime-CdArH33I.js";import{n as r,t as i}from"./PaperTexture-CIvIu9Gu.js";import{A as a,B as o,C as s,E as c,G as l,I as u,L as d,R as f,T as p,V as m,W as h,_ as g,a as _,b as v,c as y,d as b,f as x,g as S,h as C,i as w,j as T,l as E,m as D,n as O,o as k,p as A,r as j,x as ee,z as M}from"./index-B4hKey_r.js";import N from"./NotFound-DJIoVIz9.js";import{t as P}from"./dist-CdG-Kxk_.js";var F=M(`layout-grid`,[[`rect`,{width:`7`,height:`7`,x:`3`,y:`3`,rx:`1`,key:`1g98yp`}],[`rect`,{width:`7`,height:`7`,x:`14`,y:`3`,rx:`1`,key:`6d4xhi`}],[`rect`,{width:`7`,height:`7`,x:`14`,y:`14`,rx:`1`,key:`nxv5o0`}],[`rect`,{width:`7`,height:`7`,x:`3`,y:`14`,rx:`1`,key:`1bb6yr`}]]),I=M(`list`,[[`path`,{d:`M3 5h.01`,key:`18ugdj`}],[`path`,{d:`M3 12h.01`,key:`nlz23k`}],[`path`,{d:`M3 19h.01`,key:`noohij`}],[`path`,{d:`M8 5h13`,key:`1pao27`}],[`path`,{d:`M8 12h13`,key:`1za7za`}],[`path`,{d:`M8 19h13`,key:`m83p4d`}]]),L=t(e(),1),R=n();function z({item:e,className:t=``}){let{has:n,toggle:r}=b(),i=n(e.id);return(0,R.jsx)(`button`,{type:`button`,onClick:t=>{t.preventDefault(),t.stopPropagation(),r(e)},"aria-label":i?`Remove from wishlist`:`Add to wishlist`,"aria-pressed":i,className:`inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 backdrop-blur border border-border shadow-sm hover:bg-white transition ${t}`,children:(0,R.jsx)(T,{className:`h-4 w-4 transition ${i?`fill-brand text-brand`:`text-foreground`}`})})}function B({category:e}){let t=h(),n=(t[`*`]??t.categorySlug??``).split(`/`).filter(Boolean).pop()??``,[r,i]=(0,L.useState)(e??null),[a,s]=(0,L.useState)(!e),[c,l]=(0,L.useState)(`featured`),[d,p]=(0,L.useState)(`grid`);(0,L.useEffect)(()=>{if(e){i(e),s(!1);return}s(!0),i(null);async function t(){try{let e=await y(n);i(e)}catch(e){console.error(e)}finally{s(!1)}}t()},[e,n]);let g=(0,L.useMemo)(()=>{if(!r)return[];let e=[...r.products];return c===`priceAsc`&&e.sort((e,t)=>e.price-t.price),c===`priceDesc`&&e.sort((e,t)=>t.price-e.price),c===`name`&&e.sort((e,t)=>e.name.localeCompare(t.name)),e},[r,c]),v=r?.children??[],b=v.length>0,x=g.length>0;if(a)return(0,R.jsx)(O,{children:(0,R.jsx)(`div`,{className:`pt-40 text-center text-muted-foreground`,children:`Loading…`})});if(!r)return(0,R.jsx)(N,{});let S=[{"@type":`ListItem`,position:1,name:`Home`,item:`/`},{"@type":`ListItem`,position:2,name:`Collections`,item:`/collections`},...r.ancestors.map((e,t)=>({"@type":`ListItem`,position:3+t,name:e.name,item:`/collections/${r.ancestors.slice(0,t+1).map(e=>e.slug).join(`/`)}`})),{"@type":`ListItem`,position:3+r.ancestors.length,name:r.name,item:_(r)}];return(0,R.jsxs)(O,{children:[(0,R.jsx)(j,{title:`${r.name} | SatvAikya`,description:r.description,path:`/collections/${r.slug}`,image:r.image,jsonLd:{"@context":`https://schema.org`,"@type":`BreadcrumbList`,itemListElement:S}}),(0,R.jsxs)(`section`,{className:`
          relative
          overflow-hidden
          bg-black

          /* MOBILE
             1080 × 1350 = 4:5
             Therefore:
             height = viewport width × 1.25
          */
          h-[125vw]
          min-h-[480px]
          max-h-[700px]

          pt-24

          /* DESKTOP */
          md:h-[52vh]
          md:min-h-[400px]
          md:max-h-none
          md:pt-24
        `,children:[(0,R.jsxs)(`picture`,{className:`absolute inset-0 block h-full w-full`,children:[(0,R.jsx)(`source`,{media:`(max-width: 767px)`,srcSet:r.bannerMobileImage||r.bannerImage||r.image}),(0,R.jsx)(`img`,{src:r.bannerImage||r.image,alt:r.name,width:1920,height:800,className:`
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            `})]}),(0,R.jsx)(`div`,{className:`
            absolute
            inset-0

            bg-gradient-to-t
            from-black/90
            via-black/35
            to-black/10

            md:bg-gradient-to-t
            md:from-black/85
            md:via-black/40
            md:to-transparent
          `}),(0,R.jsxs)(`div`,{className:`
            relative
            z-10
            mx-auto
            flex
            h-full
            w-full
            max-w-7xl
            flex-col
            justify-end

            px-4
            pb-7

            sm:px-6
            sm:pb-9

            md:px-8
            md:pb-16
          `,children:[(0,R.jsxs)(`nav`,{className:`
              flex
              flex-wrap
              items-center
              gap-1

              text-[11px]
              leading-5
              text-white/75

              sm:text-xs
            `,children:[(0,R.jsx)(m,{to:`/`,className:`transition-colors hover:text-gold`,children:`Home`}),(0,R.jsx)(u,{className:`h-3 w-3 shrink-0`}),(0,R.jsx)(m,{to:`/collections`,className:`transition-colors hover:text-gold`,children:`Collections`}),r.ancestors.map((e,t)=>{let n=`/collections/${r.ancestors.slice(0,t+1).map(e=>e.slug).join(`/`)}`;return(0,R.jsxs)(`span`,{className:`
                      flex
                      items-center
                      gap-1
                    `,children:[(0,R.jsx)(u,{className:`h-3 w-3 shrink-0`}),(0,R.jsx)(m,{to:n,className:`transition-colors hover:text-gold`,children:e.name})]},e.slug)}),(0,R.jsx)(u,{className:`h-3 w-3 shrink-0`}),(0,R.jsx)(`span`,{className:`text-white`,children:r.name})]}),(0,R.jsx)(`span`,{className:`
              mt-3
              inline-block

              text-[10px]
              uppercase
              tracking-[0.20em]
              text-gold

              sm:mt-4
              sm:text-xs
              sm:tracking-[0.25em]
            `,children:r.tagline}),(0,R.jsx)(`h1`,{className:`
              mt-1
              font-display
              text-4xl

              sm:text-5xl

              md:mt-2
              md:text-6xl
            `,children:r.name}),(0,R.jsx)(`p`,{className:`
              mt-2
              max-w-2xl

              text-sm
              leading-relaxed
              text-white/85

              sm:text-base

              md:mt-3
            `,children:r.description})]})]}),b&&(0,R.jsx)(`section`,{className:`py-10 md:py-14`,children:(0,R.jsxs)(`div`,{className:`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`,children:[(0,R.jsx)(`h2`,{className:`mb-6 font-display text-2xl md:text-3xl`,children:x?`Sub-Collections`:`Collections`}),(0,R.jsx)(`div`,{className:`
                grid
                grid-cols-2
                gap-3

                sm:gap-5

                md:grid-cols-3
                md:gap-6

                lg:grid-cols-4
              `,children:v.map((e,t)=>(0,R.jsx)(o.article,{initial:{opacity:0,y:24},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:`-60px`},transition:{duration:.5,delay:t%4*.05},className:`
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    transition-all
                    duration-500
                    hover:shadow-2xl
                  `,children:(0,R.jsxs)(m,{to:`${_(r)}/${e.slug}`,className:`block`,children:[(0,R.jsx)(`div`,{className:`aspect-[4/3] overflow-hidden`,children:(0,R.jsx)(`img`,{src:e.image,alt:e.name,className:`
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-110
                        `,loading:`lazy`,width:800,height:600})}),(0,R.jsxs)(`div`,{className:`p-3 sm:p-5 md:p-6`,children:[(0,R.jsxs)(`div`,{className:`flex items-center justify-between gap-2`,children:[(0,R.jsxs)(`div`,{className:`min-w-0`,children:[(0,R.jsx)(`div`,{className:`
                              truncate
                              text-[10px]
                              uppercase
                              tracking-widest
                              text-gold

                              sm:text-[11px]
                            `,children:e.tagline}),(0,R.jsx)(`h3`,{className:`
                              mt-1
                              truncate
                              font-display
                              text-base
                              transition-colors
                              group-hover:text-brand

                              sm:text-xl

                              md:text-2xl
                            `,children:e.name})]}),e.products.length>0&&(0,R.jsx)(`span`,{className:`
                              hidden
                              shrink-0
                              whitespace-nowrap
                              rounded-full
                              bg-brand/10
                              px-2.5
                              py-1
                              text-xs
                              text-brand

                              sm:inline-flex
                            `,children:e.products.length})]}),(0,R.jsx)(`p`,{className:`
                          mt-2
                          hidden
                          line-clamp-2
                          text-sm
                          text-muted-foreground

                          md:block
                        `,children:e.description}),(0,R.jsxs)(`div`,{className:`
                          mt-3
                          inline-flex
                          items-center
                          gap-1
                          text-xs
                          font-medium
                          text-brand
                          transition

                          group-hover:text-gold

                          sm:text-sm

                          md:mt-5
                        `,children:[`View`,(0,R.jsx)(f,{className:`
                            h-3.5
                            w-3.5
                            transition
                            group-hover:translate-x-1

                            sm:h-4
                            sm:w-4
                          `})]})]})]})},e.slug))})]})}),x&&(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(`section`,{className:`
              sticky
              top-16
              z-20
              border-b
              border-border
              bg-background

              md:top-20
            `,children:(0,R.jsxs)(`div`,{className:`
                mx-auto
                grid
                max-w-7xl
                grid-cols-[minmax(0,1fr)_auto]
                items-center
                gap-3
                px-4
                py-4

                sm:px-6

                lg:px-8
              `,children:[(0,R.jsxs)(`div`,{className:`
                  min-w-0
                  truncate
                  text-sm
                  text-muted-foreground
                `,children:[b&&(0,R.jsxs)(`span`,{className:`mr-2 font-medium text-foreground`,children:[r.name,` Products`]}),(0,R.jsx)(`span`,{className:`font-medium text-foreground`,children:g.length}),` `,`product`,g.length===1?``:`s`]}),(0,R.jsxs)(`div`,{className:`flex shrink-0 items-center gap-2`,children:[(0,R.jsx)(`label`,{className:`hidden text-xs text-muted-foreground sm:block`,children:`Sort`}),(0,R.jsxs)(`select`,{value:c,onChange:e=>l(e.target.value),className:`
                    rounded-full
                    border
                    border-border
                    bg-card
                    px-3
                    py-2
                    text-sm
                    focus:border-brand
                    focus:outline-none
                  `,children:[(0,R.jsx)(`option`,{value:`featured`,children:`Featured`}),(0,R.jsx)(`option`,{value:`priceAsc`,children:`Price: Low → High`}),(0,R.jsx)(`option`,{value:`priceDesc`,children:`Price: High → Low`}),(0,R.jsx)(`option`,{value:`name`,children:`Alphabetical`})]}),(0,R.jsxs)(`div`,{className:`
                    hidden
                    overflow-hidden
                    rounded-full
                    border
                    border-border

                    md:inline-flex
                  `,children:[(0,R.jsx)(`button`,{"aria-label":`Grid view`,onClick:()=>p(`grid`),className:`p-2 ${d===`grid`?`bg-brand text-white`:`text-muted-foreground hover:bg-muted`}`,children:(0,R.jsx)(F,{className:`h-4 w-4`})}),(0,R.jsx)(`button`,{"aria-label":`List view`,onClick:()=>p(`list`),className:`p-2 ${d===`list`?`bg-brand text-white`:`text-muted-foreground hover:bg-muted`}`,children:(0,R.jsx)(I,{className:`h-4 w-4`})})]})]})]})}),(0,R.jsx)(`section`,{className:b?`border-t border-border py-10 md:py-14`:`py-12 md:py-16`,children:(0,R.jsxs)(`div`,{className:`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`,children:[b&&(0,R.jsxs)(`h2`,{className:`mb-6 font-display text-2xl md:text-3xl`,children:[`Products in `,r.name]}),(0,R.jsx)(`div`,{className:d===`grid`?`grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4`:`space-y-4`,children:g.map((e,t)=>(0,R.jsxs)(o.article,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:t*.06},className:d===`grid`?`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-2xl`:`group grid grid-cols-[140px_1fr] overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg sm:grid-cols-[200px_1fr]`,children:[(0,R.jsx)(z,{className:`absolute right-2 top-2 z-10`,item:{id:`${r.slug}/${e.slug}`,code:e.code,name:e.name,price:e.price,image:e.image,categorySlug:r.slug,productSlug:e.slug,url:k(r,e)}}),(0,R.jsxs)(m,{to:k(r,e),className:d===`grid`?`flex flex-1 flex-col`:`contents`,children:[(0,R.jsx)(`div`,{className:`aspect-square overflow-hidden`,children:(0,R.jsx)(`img`,{src:e.image,alt:e.name,loading:`lazy`,width:800,height:800,className:`
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-110
                          `})}),(0,R.jsxs)(`div`,{className:`flex flex-1 flex-col p-3 sm:p-4 md:p-5`,children:[(0,R.jsxs)(`div`,{className:`text-[10px] uppercase tracking-widest text-gold sm:text-[11px]`,children:[`Code `,e.code]}),(0,R.jsx)(`h3`,{className:`
                            mt-1
                            line-clamp-2
                            font-display
                            text-sm
                            transition
                            group-hover:text-brand

                            sm:text-base

                            md:text-lg
                          `,children:e.name}),(0,R.jsx)(`p`,{className:`
                            mt-1
                            hidden
                            line-clamp-2
                            text-sm
                            text-muted-foreground

                            md:block
                          `,children:e.short}),(0,R.jsxs)(`div`,{className:`mt-auto flex items-center justify-between gap-2 pt-3`,children:[(0,R.jsx)(`span`,{className:`font-display text-base text-brand sm:text-lg md:text-xl`,children:A(e.price)}),(0,R.jsx)(`span`,{className:`hidden text-xs text-brand transition group-hover:text-gold sm:inline`,children:`View →`})]})]})]})]},e.slug))})]})})]}),!b&&!x&&(0,R.jsx)(`section`,{className:`py-24 md:py-32`,children:(0,R.jsxs)(`div`,{className:`mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8`,children:[(0,R.jsx)(`div`,{className:`mb-6 text-5xl`,children:`🪵`}),(0,R.jsx)(`h2`,{className:`font-display text-3xl md:text-4xl`,children:`Products Coming Soon`}),(0,R.jsx)(`p`,{className:`mt-4 leading-relaxed text-muted-foreground`,children:`We're crafting something beautiful for this collection. Check back soon or explore our other collections in the meantime.`}),(0,R.jsxs)(m,{to:`/collections`,className:`
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-brand
                px-6
                py-3
                font-medium
                text-white
                transition
                hover:bg-brand-hover
              `,children:[`Explore Collections`,(0,R.jsx)(f,{className:`h-4 w-4`})]})]})})]})}var V=t(l(),1);function H({open:e,onClose:t,product:n,initialQuantity:r}){let{user:i,customer:a}=C(),[o,c]=(0,L.useState)(r),[l,u]=(0,L.useState)(!1),[d,f]=(0,L.useState)(!1),[m,h]=(0,L.useState)(``),[_,v]=(0,L.useState)(``),[y,b]=(0,L.useState)(``),[x,S]=(0,L.useState)(``),[T,E]=(0,L.useState)(``),[D,O]=(0,L.useState)(!1);(0,L.useEffect)(()=>{if(!e)return;let t=Math.max(5,r||5);c(t),h(`${a?.first_name??``} ${a?.last_name??``}`.trim()),v(a?.phone??``),b(i?.email??``),S(``),E(`Hi, I'm interested in ${n.name} and would like to enquire about ${t} pcs. Please share the details, pricing, and delivery information.`),f(!1)},[e,a,i,r,n.name]),(0,L.useEffect)(()=>{!e||d||E(`Hi, I'm interested in ${n.name} and would like to enquire about ${o} pcs. Please share the details, pricing, and delivery information.`)},[o,e,n.name,d]);async function k(){if(!m.trim()){alert(`Please enter your name.`);return}if(!_.trim()){alert(`Please enter your phone number.`);return}try{u(!0),await w({product_id:n.id,customer_id:i?.id,customer_name:m,phone:_,email:y,city:x,quantity:o,message:T}),O(!0),setTimeout(()=>{t(),O(!1)},2e3)}catch(e){console.error(e),P.error(`Failed to submit enquiry.`)}finally{u(!1)}}return e?D?(0,R.jsx)(`div`,{className:`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4`,children:(0,R.jsx)(`div`,{className:`w-full max-w-xl rounded-3xl bg-white shadow-2xl`,children:(0,R.jsxs)(`div`,{className:`flex flex-col items-center justify-center px-6 py-16 text-center`,children:[(0,R.jsx)(`div`,{className:`flex h-16 w-16 items-center justify-center rounded-full bg-green-100`,children:(0,R.jsx)(`svg`,{className:`h-8 w-8 text-green-600`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:(0,R.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M5 13l4 4L19 7`})})}),(0,R.jsx)(`h3`,{className:`mt-5 text-xl font-semibold text-gray-900`,children:`Enquiry sent successfully!`}),(0,R.jsx)(`p`,{className:`mt-2 text-sm text-gray-500`,children:`Thank you for your enquiry. We will get back to you shortly.`})]})})}):(0,R.jsx)(`div`,{className:`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4`,children:(0,R.jsxs)(`div`,{className:`w-full max-w-xl rounded-3xl bg-white shadow-2xl`,children:[(0,R.jsxs)(`div`,{className:`flex items-center justify-between border-b px-6 py-5`,children:[(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`h2`,{className:`text-2xl font-bold`,children:`Product Enquiry`}),(0,R.jsx)(`p`,{className:`mt-1 text-sm text-gray-500`,children:n.name})]}),(0,R.jsx)(`button`,{type:`button`,onClick:t,"aria-label":`Close enquiry modal`,children:(0,R.jsx)(g,{className:`h-6 w-6`})})]}),(0,R.jsxs)(`div`,{className:`space-y-5 p-6`,children:[(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`label`,{className:`text-sm font-medium`,children:`Quantity`}),(0,R.jsxs)(`div`,{className:`mt-2 inline-flex items-center rounded-full border`,children:[(0,R.jsx)(`button`,{type:`button`,onClick:()=>c(e=>Math.max(5,e-5)),className:`p-3`,children:(0,R.jsx)(p,{className:`h-4 w-4`})}),(0,R.jsx)(`span`,{className:`w-12 text-center`,children:o}),(0,R.jsx)(`button`,{type:`button`,onClick:()=>c(e=>e+5),className:`p-3`,children:(0,R.jsx)(s,{className:`h-4 w-4`})})]})]}),(0,R.jsx)(`input`,{className:`w-full rounded-lg border p-3`,required:!0,placeholder:`Name *`,value:m,onChange:e=>h(e.target.value)}),(0,R.jsx)(`input`,{className:`w-full rounded-lg border p-3`,type:`tel`,required:!0,placeholder:`Phone *`,value:_,onChange:e=>v(e.target.value)}),(0,R.jsx)(`input`,{className:`w-full rounded-lg border p-3`,type:`email`,placeholder:`Email (Optional)`,value:y,onChange:e=>b(e.target.value)}),(0,R.jsx)(`input`,{className:`w-full rounded-lg border p-3`,placeholder:`City (Optional)`,value:x,onChange:e=>S(e.target.value)}),(0,R.jsx)(`textarea`,{rows:5,className:`w-full rounded-lg border p-3`,placeholder:`Tell us your requirement...`,value:T,onChange:e=>{E(e.target.value),f(!0)}})]}),(0,R.jsxs)(`div`,{className:`flex justify-end gap-3 border-t px-6 py-5`,children:[(0,R.jsx)(`button`,{type:`button`,onClick:t,className:`rounded-lg border px-6 py-3`,children:`Cancel`}),(0,R.jsx)(`button`,{type:`button`,onClick:k,disabled:l,className:`rounded-lg bg-brand px-6 py-3 text-white disabled:opacity-50`,children:l?`Submitting...`:`Send Enquiry`})]})]})}):null}var U=[{q:`Is this piece handmade?`,a:`Yes — every product from SatvAikya is designed and finished by hand in our own studio.`},{q:`How long does shipping take?`,a:`We dispatch within 3–5 business days. Pan-India delivery typically takes 5–8 business days after dispatch.`},{q:`Can I return the item?`,a:`We accept returns within 7 days of delivery for unused items in original packaging. Please contact us before returning.`},{q:`Can I customise it?`,a:`For quantities of 25+, we offer custom finishes and personalisation. Please reach out on WhatsApp with your requirements.`}];function W({category:e,product:t}){let n=(h()[`*`]??``).split(`/`).filter(Boolean),[s,l]=(0,L.useState)(e??null),[f,p]=(0,L.useState)(t??null),[y,C]=(0,L.useState)(!(e&&t)),[w,M]=(0,L.useState)(5),[P,F]=(0,L.useState)(25),[I,z]=(0,L.useState)(0),[B,W]=(0,L.useState)(!1),[G,K]=(0,L.useState)(0),[te,q]=(0,L.useState)(!1),{addItem:ne}=D(),{has:re,toggle:ie}=b(),J=(0,L.useMemo)(()=>{if(!f)return[];let e=f.images&&f.images.length>0?f.images:[];return f.image?[f.image,...e.filter(e=>e!==f.image)]:e},[f]),Y=(0,L.useMemo)(()=>(s?.products??[]).filter(e=>e.slug!==f?.slug),[s,f]);if((0,L.useEffect)(()=>{z(0),K(0)},[f?.slug]),(0,L.useEffect)(()=>{if(!B)return;let e=e=>{e.key===`Escape`&&W(!1),e.key===`ArrowLeft`&&Q(),e.key===`ArrowRight`&&$()};return document.addEventListener(`keydown`,e),()=>{document.removeEventListener(`keydown`,e)}},[B]),(0,L.useEffect)(()=>{if(e&&t){l(e),p(t),C(!1);return}C(!0);async function r(){try{let e=await E(n);e?.type===`product`?(l(e.category),p(e.product)):(l(null),p(null))}catch(e){console.error(e)}finally{C(!1)}}r()},[e,t,n.join(`/`)]),y)return(0,R.jsx)(O,{children:(0,R.jsx)(`div`,{className:`pt-40 text-center text-muted-foreground`,children:`Loading…`})});if(!s||!f)return(0,R.jsx)(N,{});let X={id:`${s.slug}/${f.slug}`,code:f.code,name:f.name,price:f.price,image:f.image,categorySlug:s.slug,productSlug:f.slug,url:k(s,f)},Z=re(X.id),ae=f.code?.trim()?` (${f.code.trim()})`:``,oe=`https://wa.me/${x}?text=${encodeURIComponent(`Hi SatvAikya, I'm interested in ${f.name}${ae}.`)}`,Q=()=>{J.length<=1||z(e=>{let t=e===0?J.length-1:e-1;return J.length>4&&(t===J.length-1?K(J.length-4):t<G&&K(t)),t})},$=()=>{J.length<=1||z(e=>{let t=e===J.length-1?0:e+1;return J.length>4&&(t===0?K(0):t>=G+4&&K(Math.min(t-3,J.length-4))),t})},se=()=>{K(e=>Math.max(0,e-1))},ce=()=>{let e=Math.max(0,J.length-4);K(t=>Math.min(e,t+1))},le=e=>{z(e)};return(0,R.jsxs)(`div`,{className:`relative isolate overflow-hidden`,children:[(0,R.jsx)(i,{}),(0,R.jsxs)(O,{children:[(0,R.jsx)(j,{title:`${f.name} | SatvAikya`,description:f.short,path:`/collections/${s.slug}/${f.slug}`,image:f.image,type:`product`,jsonLd:{"@context":`https://schema.org`,"@type":`Product`,name:f.name,sku:f.code,description:f.long,image:f.image,brand:{"@type":`Brand`,name:`SatvAikya`},offers:{"@type":`Offer`,priceCurrency:`INR`,price:f.price,availability:`https://schema.org/InStock`}}}),(0,R.jsx)(`section`,{className:`pt-4 md:pt-6 pb-4 md:pb-6 relative z-10`,children:(0,R.jsx)(`div`,{className:`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`,children:(0,R.jsxs)(`nav`,{className:`text-xs text-muted-foreground flex items-center gap-1 flex-wrap`,children:[(0,R.jsx)(m,{to:`/`,className:`hover:text-brand transition-colors`,children:`Home`}),(0,R.jsx)(u,{className:`h-3 w-3 shrink-0`}),(0,R.jsx)(m,{to:`/collections`,className:`hover:text-brand transition-colors`,children:`Collections`}),s.ancestors.map((e,t)=>{let n=`/collections/${s.ancestors.slice(0,t+1).map(e=>e.slug).join(`/`)}`;return(0,R.jsxs)(`div`,{className:`flex items-center gap-1`,children:[(0,R.jsx)(u,{className:`h-3 w-3 shrink-0`}),(0,R.jsx)(m,{to:n,className:`hover:text-brand transition-colors`,children:e.name})]},e.slug)}),(0,R.jsx)(u,{className:`h-3 w-3 shrink-0`}),(0,R.jsx)(m,{to:_(s),className:`hover:text-brand transition-colors`,children:s.name}),(0,R.jsx)(u,{className:`h-3 w-3 shrink-0`}),(0,R.jsx)(`span`,{className:`text-foreground truncate`,children:f.name})]})})}),(0,R.jsx)(`section`,{className:`pb-16`,children:(0,R.jsxs)(`div`,{className:`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10`,children:[(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`div`,{className:`relative touch-pan-y`,onTouchStart:e=>{e.currentTarget.dataset.touchStartX=String(e.touches[0].clientX)},onTouchEnd:e=>{let t=Number(e.currentTarget.dataset.touchStartX)-e.changedTouches[0].clientX;Math.abs(t)>50&&J.length>1&&(t>0?$():Q())},children:(0,R.jsxs)(o.div,{initial:{opacity:0,x:12},animate:{opacity:1,x:0},transition:{duration:.25},className:`relative aspect-square rounded-2xl overflow-hidden bg-transparent flex items-center justify-center p-0`,children:[(0,R.jsx)(`button`,{type:`button`,onClick:()=>W(!0),"aria-label":`Open product image fullscreen`,className:`absolute inset-0 w-full h-full cursor-zoom-in`,children:(0,R.jsx)(`img`,{src:J[I],alt:f.name,className:`block h-full w-full object-contain select-none`,loading:`eager`,decoding:`async`,draggable:!1,width:1600,height:1600})}),(0,R.jsx)(`button`,{type:`button`,onClick:()=>ie(X),"aria-pressed":Z,"aria-label":Z?`Remove from wishlist`:`Add to wishlist`,className:`absolute top-3 right-3 z-10 h-10 w-10 inline-flex items-center justify-center rounded-full backdrop-blur-md shadow-sm transition-all active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${Z?`bg-brand text-white`:`bg-white/80 text-foreground hover:bg-white`}`,children:(0,R.jsx)(T,{className:`h-4.5 w-4.5 ${Z?`fill-white`:``}`})})]},I)}),J.length>0&&(0,R.jsxs)(`div`,{className:`mt-4 relative`,children:[(0,R.jsxs)(`div`,{className:`flex items-center gap-2`,children:[J.length>4&&(0,R.jsx)(`button`,{type:`button`,onClick:se,disabled:G===0,"aria-label":`Previous thumbnails`,className:`
                          shrink-0
                          h-9
                          w-9
                          rounded-full
                          border
                          border-border
                          bg-white/90
                          inline-flex
                          items-center
                          justify-center
                          shadow-sm
                          transition-all
                          hover:bg-white
                          active:scale-90
                          disabled:opacity-30
                          disabled:cursor-not-allowed
                        `,children:(0,R.jsx)(d,{className:`h-4 w-4`})}),(0,R.jsx)(`div`,{className:`flex-1 min-w-0 overflow-hidden`,children:(0,R.jsx)(`div`,{className:`grid grid-cols-4 gap-2.5`,children:J.slice(G,G+4).map((e,t)=>{let n=G+t;return(0,R.jsxs)(`button`,{type:`button`,onClick:()=>le(n),"aria-label":`View product image ${n+1}`,"aria-current":I===n,className:`
                                  relative
                                  aspect-square
                                  rounded-lg
                                  overflow-hidden
                                  border-2
                                  bg-transparent
                                  transition-all
                                  duration-200
                                  focus-visible:outline-none
                                  focus-visible:ring-2
                                  focus-visible:ring-brand
                                  focus-visible:ring-offset-2
                                  ${I===n?`border-brand shadow-sm`:`border-border hover:border-gold`}
                                `,children:[(0,R.jsx)(`img`,{src:e,alt:`${f.name} view ${n+1}`,loading:`lazy`,decoding:`async`,draggable:!1,width:300,height:300,className:`h-full w-full object-contain bg-transparent select-none`}),I===n&&(0,R.jsx)(`span`,{className:`
                                      absolute
                                      inset-x-0
                                      bottom-0
                                      h-0.5
                                      bg-brand
                                    `})]},`${e}-${n}`)})})}),J.length>4&&(0,R.jsx)(`button`,{type:`button`,onClick:ce,disabled:G>=J.length-4,"aria-label":`Next thumbnails`,className:`
                          shrink-0
                          h-9
                          w-9
                          rounded-full
                          border
                          border-border
                          bg-white/90
                          inline-flex
                          items-center
                          justify-center
                          shadow-sm
                          transition-all
                          hover:bg-white
                          active:scale-90
                          disabled:opacity-30
                          disabled:cursor-not-allowed
                        `,children:(0,R.jsx)(u,{className:`h-4 w-4`})})]}),J.length>1&&(0,R.jsxs)(`div`,{className:`mt-2 text-center text-[11px] text-muted-foreground`,children:[I+1,` / `,J.length]})]})]}),(0,R.jsxs)(`div`,{children:[(0,R.jsxs)(`div`,{className:`text-xs uppercase tracking-[0.25em] text-gold`,children:[s.name,` · Code `,f.code]}),(0,R.jsx)(`h1`,{className:`mt-2 font-display text-3xl md:text-5xl`,children:f.name}),(0,R.jsx)(`div`,{className:`mt-3 flex items-center gap-2`}),(0,R.jsx)(`div`,{className:`mt-5 font-display text-4xl text-brand`,children:A(f.price)}),(0,R.jsx)(`p`,{className:`mt-4 text-muted-foreground leading-relaxed`,children:f.short}),(0,R.jsxs)(`div`,{className:`mt-8 space-y-3`,children:[(0,R.jsxs)(`div`,{className:`space-y-3`,children:[(0,R.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,R.jsx)(`span`,{className:`text-sm font-medium text-muted-foreground`,children:`Quantity`}),(0,R.jsxs)(`span`,{className:`px-2 py-0.5 rounded-md bg-yellow-400 text-black text-xs font-semibold`,children:[w,` Pcs`]})]}),(0,R.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[(0,R.jsx)(`button`,{type:`button`,onClick:()=>M(5),className:`
        h-11
        px-5
        rounded-md
        border
        text-sm
        font-medium
        transition-all
        active:scale-95
        ${w===5?`bg-[#1f2937] text-white border-[#1f2937]`:`bg-white text-muted-foreground border-border hover:border-[#1f2937]`}
      `,children:`5 Pcs`}),(0,R.jsx)(`button`,{type:`button`,onClick:()=>M(10),className:`
        h-11
        px-5
        rounded-md
        border
        text-sm
        font-medium
        transition-all
        active:scale-95
        ${w===10?`bg-[#1f2937] text-white border-[#1f2937]`:`bg-white text-muted-foreground border-border hover:border-[#1f2937]`}
      `,children:`10 Pcs`}),(0,R.jsx)(`button`,{type:`button`,onClick:()=>M(15),className:`
        h-11
        px-5
        rounded-md
        border
        text-sm
        font-medium
        transition-all
        active:scale-95
        ${w===15?`bg-[#1f2937] text-white border-[#1f2937]`:`bg-white text-muted-foreground border-border hover:border-[#1f2937]`}
      `,children:`15 Pcs`}),(0,R.jsx)(`button`,{type:`button`,onClick:()=>M(20),className:`
        h-11
        px-5
        rounded-md
        border
        text-sm
        font-medium
        transition-all
        active:scale-95
        ${w===20?`bg-[#1f2937] text-white border-[#1f2937]`:`bg-white text-muted-foreground border-border hover:border-[#1f2937]`}
      `,children:`20 Pcs`}),(0,R.jsxs)(`div`,{className:`
        h-11
        inline-flex
        items-center
        rounded-md
        border
        overflow-hidden
        transition-all
        ${w===P?`border-[#1f2937] bg-[#1f2937] text-white`:`border-border bg-white text-muted-foreground hover:border-[#1f2937]`}
      `,children:[(0,R.jsx)(`button`,{type:`button`,onClick:()=>F(e=>Math.max(25,e-5)),className:`
          h-full
          w-9
          flex
          items-center
          justify-center
          hover:bg-black/5
          transition-colors
          active:scale-95
        `,"aria-label":`Decrease custom quantity`,children:`−`}),(0,R.jsxs)(`button`,{type:`button`,onClick:()=>M(P),className:`
          h-full
          min-w-[70px]
          px-2
          text-sm
          font-medium
          text-center
          transition-colors
          ${w===P?`bg-[#1f2937] text-white`:`bg-white text-muted-foreground`}
        `,children:[P,` Pcs`]}),(0,R.jsx)(`button`,{type:`button`,onClick:()=>F(e=>e+5),className:`
          h-full
          w-9
          flex
          items-center
          justify-center
          hover:bg-black/5
          transition-colors
          active:scale-95
        `,"aria-label":`Increase custom quantity`,children:`+`})]})]})]}),(0,R.jsxs)(`div`,{className:`grid gap-3 ${f.amazonEnabled&&f.amazonUrl?`grid-cols-2`:`grid-cols-1`}`,children:[(0,R.jsxs)(`button`,{type:`button`,onClick:()=>ne({productId:f.id,code:f.code,name:f.name,price:f.price,image:f.image,categorySlug:s.slug,productSlug:f.slug,url:k(s,f)},w),className:`h-13 sm:h-14 inline-flex items-center justify-center gap-2 px-3 sm:px-6 rounded-full bg-[#97B002] text-white font-medium text-xs sm:text-base shadow-sm hover:bg-[#869C02] hover:shadow-md active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#97B002] focus-visible:ring-offset-2`,children:[(0,R.jsx)(v,{className:`h-4.5 w-4.5 shrink-0`}),(0,R.jsx)(`span`,{className:`truncate`,children:`Add to Cart`})]}),f.amazonEnabled&&f.amazonUrl&&(0,R.jsxs)(`a`,{href:f.amazonUrl,target:`_blank`,rel:`noopener noreferrer`,className:`h-13 sm:h-14 inline-flex items-center justify-center gap-2 px-3 sm:px-6 rounded-full bg-[#FF9900] text-white font-medium text-xs sm:text-base hover:bg-[#E68A00] active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] focus-visible:ring-offset-2`,children:[(0,R.jsx)(v,{className:`h-4 w-4 shrink-0`}),(0,R.jsx)(`span`,{className:`truncate`,children:`Buy on Amazon`})]})]}),(0,R.jsxs)(`div`,{className:`grid grid-cols-2 gap-3 pt-1`,children:[(0,R.jsx)(`button`,{type:`button`,onClick:()=>q(!0),className:`h-12 inline-flex items-center justify-center gap-2 px-3 sm:px-5 rounded-full bg-[#97B002] text-white font-medium text-xs sm:text-sm hover:bg-[#869C02] active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#97B002] focus-visible:ring-offset-2`,children:(0,R.jsx)(`span`,{className:`truncate`,children:`Send Enquiry`})}),(0,R.jsxs)(`a`,{href:oe,target:`_blank`,rel:`noopener noreferrer`,className:`h-12 inline-flex items-center justify-center gap-2 px-3 sm:px-5 rounded-full border border-border font-medium text-xs sm:text-sm hover:bg-muted active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2`,children:[(0,R.jsx)(c,{className:`h-4 w-4 shrink-0`}),(0,R.jsx)(`span`,{className:`truncate`,children:`WhatsApp`})]})]}),(f.instagramUrl||f.youtubeUrl)&&(0,R.jsxs)(`div`,{className:`pt-5 mt-1 border-t border-border`,children:[(0,R.jsx)(`div`,{className:`text-xs uppercase tracking-widest text-muted-foreground mb-3`,children:`See this product in action`}),(0,R.jsxs)(`div`,{className:`flex gap-3`,children:[f.instagramUrl&&(0,R.jsxs)(`a`,{href:f.instagramUrl,target:`_blank`,rel:`noopener noreferrer`,className:`h-11 flex-1 inline-flex items-center justify-center gap-2 px-4 rounded-full border border-transparent bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2`,children:[(0,R.jsx)(a,{className:`h-4 w-4 shrink-0`}),(0,R.jsx)(`span`,{className:`truncate`,children:`Instagram`})]}),f.youtubeUrl&&(0,R.jsxs)(`a`,{href:f.youtubeUrl,target:`_blank`,rel:`noopener noreferrer`,className:`h-11 flex-1 inline-flex items-center justify-center gap-2 px-4 rounded-full border border-transparent bg-[#FF0033] text-white text-sm font-medium hover:bg-[#e6002d] active:scale-[0.99] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF0033] focus-visible:ring-offset-2`,children:[(0,R.jsx)(S,{className:`h-4 w-4 shrink-0`}),(0,R.jsx)(`span`,{className:`truncate`,children:`YouTube`})]})]})]})]}),(0,R.jsxs)(`div`,{className:`mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm`,children:[(0,R.jsxs)(`div`,{className:`flex items-start gap-2 p-3 rounded-lg bg-muted/50`,children:[(0,R.jsx)(r,{className:`h-4 w-4 mt-0.5 text-brand shrink-0`}),(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`div`,{className:`font-medium`,children:`Pan-India shipping`}),(0,R.jsx)(`div`,{className:`text-muted-foreground text-xs`,children:`Ships in 3–5 business days.`})]})]}),(0,R.jsxs)(`div`,{className:`flex items-start gap-2 p-3 rounded-lg bg-muted/50`,children:[(0,R.jsx)(ee,{className:`h-4 w-4 mt-0.5 text-brand shrink-0`}),(0,R.jsxs)(`div`,{children:[(0,R.jsx)(`div`,{className:`font-medium`,children:`Made with love`}),(0,R.jsx)(`div`,{className:`text-muted-foreground text-xs`,children:`Quality checked, hand packed.`})]})]})]}),(0,R.jsxs)(`div`,{className:`mt-10`,children:[(0,R.jsx)(`h2`,{className:`font-display text-2xl`,children:`About this piece`}),(0,R.jsx)(`p`,{className:`mt-3 text-muted-foreground leading-relaxed`,children:f.long})]})]})]})}),(0,R.jsx)(`section`,{className:`py-16`,children:(0,R.jsxs)(`div`,{className:`mx-auto max-w-3xl px-4 sm:px-6 lg:px-8`,children:[(0,R.jsx)(`h2`,{className:`font-display text-3xl md:text-4xl text-center`,children:`Frequently asked`}),(0,R.jsx)(`div`,{className:`mt-8 space-y-3`,children:U.map(e=>(0,R.jsxs)(`details`,{className:`group rounded-xl border border-border bg-card p-5 open:shadow-md transition`,children:[(0,R.jsxs)(`summary`,{className:`cursor-pointer list-none flex items-center justify-between font-medium`,children:[e.q,(0,R.jsx)(u,{className:`h-4 w-4 group-open:rotate-90 transition`})]}),(0,R.jsx)(`p`,{className:`mt-3 text-sm text-muted-foreground leading-relaxed`,children:e.a})]},e.q))})]})}),Y.length>0&&(0,R.jsx)(`section`,{className:`py-16 bg-[oklch(0.95_0.01_85)]`,children:(0,R.jsxs)(`div`,{className:`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`,children:[(0,R.jsx)(`h2`,{className:`font-display text-3xl md:text-4xl`,children:`You may also love`}),(0,R.jsx)(`div`,{className:`mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6`,children:Y.map(e=>(0,R.jsxs)(m,{to:k(s,e),className:`group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all flex flex-col`,children:[(0,R.jsx)(`div`,{className:`aspect-square overflow-hidden`,children:(0,R.jsx)(`img`,{src:e.image,alt:e.name,loading:`lazy`,width:600,height:600,className:`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110`})}),(0,R.jsxs)(`div`,{className:`p-3 sm:p-4 md:p-5 flex-1 flex flex-col`,children:[(0,R.jsxs)(`div`,{className:`text-[10px] sm:text-[11px] uppercase tracking-widest text-gold`,children:[`Code `,e.code]}),(0,R.jsx)(`h3`,{className:`mt-1 font-display text-sm sm:text-base md:text-lg group-hover:text-brand transition line-clamp-2`,children:e.name}),(0,R.jsx)(`div`,{className:`mt-auto pt-2 font-display text-base sm:text-lg text-brand`,children:A(e.price)})]})]},e.slug))})]})}),B&&(0,V.createPortal)((0,R.jsxs)(`div`,{className:`
        fixed
        inset-0
        z-[99999]
        w-screen
        h-[100dvh]
        bg-black/75
        md:bg-black
        flex
        items-center
        justify-center
        overflow-hidden
      `,role:`dialog`,"aria-modal":`true`,"aria-label":`Product image viewer`,onClick:()=>W(!1),children:[(0,R.jsx)(`button`,{type:`button`,onClick:e=>{e.stopPropagation(),W(!1)},"aria-label":`Close image viewer`,className:`
          absolute
          top-4
          right-4
          sm:top-6
          sm:right-6
          z-[100]
          h-11
          w-11
          sm:h-12
          sm:w-12
          rounded-full
          bg-white/10
          text-white
          backdrop-blur-md
          border
          border-white/20
          inline-flex
          items-center
          justify-center
          hover:bg-white/20
          active:scale-90
          transition-all
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
        `,children:(0,R.jsx)(g,{className:`h-5 w-5 sm:h-6 sm:w-6`})}),J.length>1&&(0,R.jsxs)(`div`,{className:`
            absolute
            top-5
            left-1/2
            -translate-x-1/2
            z-[100]
            px-3
            py-1.5
            rounded-full
            bg-white/10
            text-white
            text-xs
            backdrop-blur-md
            border
            border-white/10
          `,children:[I+1,` / `,J.length]}),J.length>1&&(0,R.jsx)(`button`,{type:`button`,onClick:e=>{e.stopPropagation(),Q()},"aria-label":`Previous image`,className:`
            absolute
            left-3
            sm:left-6
            top-1/2
            -translate-y-1/2
            z-[100]
            h-11
            w-11
            sm:h-12
            sm:w-12
            rounded-full
            bg-white/10
            text-white
            backdrop-blur-md
            border
            border-white/20
            inline-flex
            items-center
            justify-center
            hover:bg-white/20
            active:scale-90
            transition-all
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
          `,children:(0,R.jsx)(d,{className:`h-6 w-6`})}),(0,R.jsx)(o.div,{initial:{opacity:0,scale:.96},animate:{opacity:1,scale:1},transition:{duration:.25,ease:`easeOut`},className:`
          relative
          w-screen
          h-auto
          flex
          items-center
          justify-center
          px-0
          py-0
          md:h-[100dvh]
          md:px-24
          md:py-20
        `,onClick:e=>e.stopPropagation(),children:(0,R.jsx)(`img`,{src:J[I],alt:`${f.name} fullscreen`,draggable:!1,className:`
            block
            w-screen
            max-w-[100vw]
            h-auto
            max-h-[100dvh]
            object-contain
            select-none
            md:w-auto
            md:max-w-full
            md:max-h-full
          `})},I),J.length>1&&(0,R.jsx)(`button`,{type:`button`,onClick:e=>{e.stopPropagation(),$()},"aria-label":`Next image`,className:`
            absolute
            right-3
            sm:right-6
            top-1/2
            -translate-y-1/2
            z-[100]
            h-11
            w-11
            sm:h-12
            sm:w-12
            rounded-full
            bg-white/10
            text-white
            backdrop-blur-md
            border
            border-white/20
            inline-flex
            items-center
            justify-center
            hover:bg-white/20
            active:scale-90
            transition-all
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
          `,children:(0,R.jsx)(u,{className:`h-6 w-6`})}),J.length>1&&(0,R.jsx)(`div`,{className:`
            absolute
            bottom-5
            left-1/2
            -translate-x-1/2
            z-[100]
            text-white/50
            text-[11px]
            sm:hidden
            whitespace-nowrap
          `,children:`Swipe to view more`})]}),document.body),(0,R.jsx)(H,{open:te,onClose:()=>q(!1),product:f,initialQuantity:w})]})]})}function G(){let e=(h()[`*`]??``).split(`/`).filter(Boolean),t=e.join(`/`),[n,r]=(0,L.useState)(void 0);return(0,L.useEffect)(()=>{let t=!1;return r(void 0),E(e).then(e=>{t||r(e)}).catch(e=>{console.error(e),t||r(null)}),()=>{t=!0}},[t]),n===void 0?(0,R.jsx)(O,{children:(0,R.jsx)(`div`,{className:`pt-40 text-center text-muted-foreground`,children:`Loading…`})}):n===null?(0,R.jsx)(N,{}):n.type===`category`?(0,R.jsx)(B,{category:n.category}):(0,R.jsx)(W,{category:n.category,product:n.product})}export{G as default};